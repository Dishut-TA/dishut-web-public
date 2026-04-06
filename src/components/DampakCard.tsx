interface Props {
  value: string;
  label: string;
}

const DampakCard = ({ value, label }: Props) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md px-5 py-4 w-full sm:w-[280px]">
      
      {/* ICON BULAT */}
      <div className="w-12 h-12 bg-secondary rounded-full flex-shrink-0" />

      {/* TEXT */}
      <div>
        <p className="text-primary font-bold text-lg">{value}</p>
        <p className="text-primary text-sm">{label}</p>
      </div>
    </div>
  );
};

export default DampakCard;