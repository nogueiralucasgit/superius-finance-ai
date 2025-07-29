import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "./_components/navbar";
import SummaryCard from "./(home)/_components/sumarry-cards";
import TimeSelect from "./(home)/_components/time-select";
import { ChartPie } from "./(home)/_components/chart-radial";
import { getDashboard } from "./_actions/add-transaction.ts";
import { isMatch } from "date-fns";
import { BarChartCategory } from "./(home)/_components/bar-chart-category";
import DataTableLastTransactions from "./_components/ui/datatable-last-transactions";
interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  console.log(dashboard);

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-5">
          {/* Coluna maior à esquerda */}
          <div className="space-y-5">
            <SummaryCard
              balance={dashboard.balance}
              depositsTotal={dashboard.depositsTotal}
              expensesTotal={dashboard.expensesTotal}
              investmentsTotal={dashboard.investmentsTotal}
              userCanAddTransaction={true}
            />

            {/* Chart + outro componente lado a lado */}
            <div className="flex gap-5">
              <div className="h-2/3 w-2/3">
                <ChartPie
                  DEPOSIT={dashboard.typesPercentage.DEPOSIT}
                  EXPENSE={dashboard.typesPercentage.EXPENSE}
                  INVESTMENT={dashboard.typesPercentage.INVESTMENT}
                />
              </div>
              <div className="w-2/3">
                <BarChartCategory
                  totalExpensePerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </div>

          {/* Coluna menor à direita */}
          <div className="space-y-5">
            {/* Aqui você pode colocar novos cards, gráficos, etc */}
            <DataTableLastTransactions
              transactions={dashboard.lastTransactions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
