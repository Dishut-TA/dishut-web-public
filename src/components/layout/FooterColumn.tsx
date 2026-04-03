interface Props {
  title: string;
  items: string[];
}

const FooterColumn = ({ title, items }: Props) => {
  return (
    <div>
      <h4 className="font-semibold text-primary mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-primary">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-tertiary transition-all"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;