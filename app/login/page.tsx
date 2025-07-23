import Image from "next/image";
import { Button } from "@/app/_components/ui/button";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* {ESQUERDA} */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Superius Finance AI"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>{" "}
        <p className="mb-8 text-muted-foreground">
          A Superius Finance AI é uma plataforma de gestão financeira que
          utiliza IA para monitorar suas movimentações, e oferecer insights
          personalizados, facilitando o controle do seu orçamento.
        </p>
        <Button variant="outline">Fazer login ou criar conta</Button>
      </div>
      {/* {DIREITA} */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
