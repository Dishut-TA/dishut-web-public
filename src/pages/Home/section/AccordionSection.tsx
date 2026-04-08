import AccordionItem from "../components/AccordionItem";

const DATA = [
  {
    title: "Apa Itu Lahan Kritis",
    content:
      "Lorem ipsum dolor sit amet",
  },
  {
    title: "Dampak Kerusakan Hutan",
    content:
      "Kerusakan hutan menurunkan fungsi ekologis lingkungan, seperti berkurangnya kemampuan tanah menyerap air dan meningkatnya risiko banjir serta longsor. Selain itu, kerusakan hutan juga menyebabkan hilangnya habitat flora dan fauna. Oleh karena itu, rehabilitasi dan konservasi hutan penting dilakukan untuk memulihkan kondisi lingkungan dan menjaga keberlanjutan ekosistem.",
  },
  {
    title: "Pentingnya Rehabilitasi",
    content:
      "Lorem ipsum dolor sit amet",
  },
];

const AccordionSection = () => {
  return (
    <section className="w-full py-16 px-12 md:px-24 bg-customWhite">
      <div className="mx-auto">
         <h2 className="text-2xl md:text-4xl font-semibold text-primary">
            Memahami Peta Kekritisan Lahan
          </h2>
        <div className="space-y-3 mt-4">
          {DATA.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AccordionSection;