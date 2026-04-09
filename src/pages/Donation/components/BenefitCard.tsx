type BenefitCardProps = {
  title: string;
  description: string;
  icon: string;
};

const BenefitCard = ({ title, description, icon }: BenefitCardProps) => {
  return (
    <div className="bg-primary text-customWhite rounded-2xl p-6 flex flex-col items-center text-center 
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-customWhite flex items-center justify-center mb-5">
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-customWhite leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;