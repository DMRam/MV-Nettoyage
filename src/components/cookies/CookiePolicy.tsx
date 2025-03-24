import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";
import { useLanguageSelector } from "../../hooks/useLanguageSelector"; // Import your custom hook
import { cookie_policy_translations } from "./CookiesTranscriptions";

export const CookiePolicy = () => {
    // Get the selected language from your custom hook
    const { languageSelected } = useLanguageSelector();

    // Get the translations based on the selected language
    const {
        title,
        intro,
        whatAreCookies,
        howWeUseCookies,
        managingCookies,
    } = cookie_policy_translations[languageSelected] || cookie_policy_translations["fr"]; // Fallback to English

    return (
        <div className="p-8 max-w-4xl mx-auto mt-20">
            <OtherScreenNavBar />
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <p className="text-lg mb-4">{intro}</p>

            {/* What Are Cookies? */}
            <h2 className="text-2xl font-bold mt-6 mb-4">{whatAreCookies.title}</h2>
            <p className="text-lg mb-4">{whatAreCookies.content}</p>

            {/* How We Use Cookies */}
            <h2 className="text-2xl font-bold mt-6 mb-4">{howWeUseCookies.title}</h2>
            <p className="text-lg mb-4">
                {howWeUseCookies.content}
                <ul className="list-disc pl-8 mt-2">
                    {howWeUseCookies.list.map((item: any, index: any) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </p>

            {/* Managing Cookies */}
            <h2 className="text-2xl font-bold mt-6 mb-4">{managingCookies.title}</h2>
            <p className="text-lg mb-4">{managingCookies.content}</p>
        </div>
    );
};