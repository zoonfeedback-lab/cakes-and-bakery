type SectionHeadingProps = Readonly<{
    title: string;
    subtitle: string;
}>;

export const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
    return (
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
            <h2 className="section-title text-3xl md:text-5xl">{title}</h2>
            <p className="body-copy mt-3 text-sm uppercase tracking-[0.18em] md:text-[0.8rem]">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionHeading;
