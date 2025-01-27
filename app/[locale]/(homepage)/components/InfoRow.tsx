import infoRowImage from "@/public/images/hero.webp";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  reverse?: boolean;
};

const InfoRow = ({ title, description, buttonText, reverse }: Props) => {
  return (
    <section className="my-2">
      <div
        className={`flex items-center justify-center gap-x-12 ${reverse ? "flex-row-reverse" : ""}`}
      >
        <Image
          src={infoRowImage}
          alt="info-row-image"
          width={500}
          height={500}
          className="object-cover flex-1 rounded-md shadow-md"
        />
        <div className="flex items-center justify-center flex-1">
          <div className="max-w-lg">
            <h3 className="text-2xl font-bold text-[var(--main-darker)]">
              {title}
            </h3>
            <p className="my-4">{description}</p>
            <button className="bg-[var(--main-dark)] hover:bg-[var(--main-darker)] cursor-pointer transition-all duration-300 text-[var(--main-lighter)] px-8 py-2 rounded-sm">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoRow;
