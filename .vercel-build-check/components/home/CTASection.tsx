type CTASectionProps = Readonly<{
    onCTAClick?: () => void;
}>;

export const CTASection = ({ onCTAClick }: CTASectionProps) => {
    return (
        <section className="py-14 sm:py-20 md:py-24 bg-surface text-center px-4">
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                <h2 className="section-title text-2xl sm:text-3xl md:text-5xl">
                    Plan Your Next<br/>Celebration With Us
                </h2>

                <p className="body-copy max-w-md mx-auto text-xs sm:text-sm">
                    Whether it&apos;s a grand wedding or an intimate birthday, let us bake your dreams into reality.
                </p>

                <div className="pt-2 sm:pt-4">
                    <button
                        onClick={onCTAClick}
                        className="btn-primary w-full sm:w-auto"
                    >
                        Start Customizing
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
