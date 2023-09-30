import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

export default async function DashboardPage({ params }: DashboardPageProps ) {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (
    <>
       <div>A loja ativa é: {store?.name}</div>
    </>
  );
}