import React from "react";
import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";

export const CookiePolicy = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <OtherScreenNavBar />
            <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-lg mb-4">
                We use cookies to improve your experience on our website. This policy explains what cookies are, how we use them, and how you can manage them.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">What Are Cookies?</h2>
            <p className="text-lg mb-4">
                Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">How We Use Cookies</h2>
            <p className="text-lg mb-4">
                We use cookies for:
                <ul className="list-disc pl-8 mt-2">
                    <li>Analyzing website traffic</li>
                    <li>Remembering your preferences</li>
                    <li>Improving website performance</li>
                </ul>
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">Managing Cookies</h2>
            <p className="text-lg mb-4">
                You can manage or disable cookies through your browser settings. However, this may affect your experience on our website.
            </p>
        </div>
    );
};