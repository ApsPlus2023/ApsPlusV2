'use client';

interface CardProps {
  title: string;
  number: string;
  percentage: string;
  percentageColor: string;
  icon: string;
  iconColor: string;
  description: string;
  bgColor: number;
}

const Card = ({ title, number, percentage, percentageColor, icon, iconColor, description, bgColor }: CardProps) => {
  const bgClass = bgColor === 1 ? "bg-[#deffed]" : "bg-[#ffe6e4]";

  return (
    <div className={`lg:w-[230px] w-full h-32 flex flex-col px-2 py-3 justify-center bg-white rounded-2xl shadow`}>
      <div className="flex justify-between items-center w-full px-4 mt-1">
        <h3 className="text-xs font-semibold text-[#7a7a9d]">{title}</h3>
      </div>
      <div className="flex pr-6">
        <h2 className="text-3xl font-semibold text-left w-full px-4 mt-1">{number}</h2>
        <div className={`rounded-full h-11 w-14 -mt-5 ${iconColor} flex items-center justify-center`}>
          <i className={`bi ${icon} text-white text-xl`}></i>
        </div>
      </div>
      <div className="flex gap-3 justify-start items-center px-4 mt-2">
        <div className={`${bgClass} px-2 py-1 rounded-md`}>
          <span className={`text-xs font-semibold ${percentageColor}`}>{percentage}</span>
        </div>
        <p className="text-xs text-[#7a7a9d]">{description}</p>
      </div>
    </div>
  );
};

export default function AdminCards() {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-6 mx-5">
      <Card
        title="Novos pacientes"
        number="175"
        percentage="+13%"
        percentageColor="text-[#66cb9f]"
        icon="bi-graph-up"
        iconColor="bg-[#FF92AE]"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Pacientes atendidos"
        number="215"
        percentage="+30%"
        percentageColor="text-green-500"
        icon="bi-people"
        iconColor="bg-blue-500"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Taxa de satisfação"
        number="85%"
        percentage="+10%"
        percentageColor="text-green-500"
        icon="bi-emoji-laughing"
        iconColor="bg-teal-500"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Comparecimento"
        number="78%"
        percentage="-4%"
        percentageColor="text-red-500"
        icon="bi-check-circle"
        iconColor="bg-orange-500"
        description="desde o mês passado"
        bgColor={2}
      />
    </div>
  );
}
