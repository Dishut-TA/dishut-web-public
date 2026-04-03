interface PartnerItem {
  name: string;
  logo: string;
}

interface Props {
  title: string;
  partners: PartnerItem[];
}

const FooterPartner = ({ title, partners }: Props) => {
  return (
    <div>
      <h4 className="font-semibold text-primary mb-3">{title}</h4>

      <div className="flex items-center gap-3 flex-wrap">
        {partners.map((item) => (
          <img
            key={item.name}
            src={item.logo}
            alt={item.name}
            className="w-12.5 h-12.5 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default FooterPartner;