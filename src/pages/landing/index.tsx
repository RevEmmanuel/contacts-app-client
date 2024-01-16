import React from 'react';
import Container from "../../components/Container";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

interface IProps {}

function LandingPage(props: IProps) {
    return (
        <Container>
            <header className="text-center py-8">
                <h1 className="text-4xl font-bold text-blue-600">Contacts Web Application</h1>
                <p className="text-lg text-gray-600">A simple and easy-to-use web application for managing your contacts.</p>
            </header>
            <main className="px-8 py-4">
                <h1 className="text-3xl font-semibold mb-4">Landing Page</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Features</h2>
                    <ul className="list-disc list-inside">
                        <li>Add, edit, and delete contacts</li>
                        <li>Search for contacts by name or phone number</li>
                        <a
                            href="https://documenter.getpostman.com/view/24879226/2s9YJaZ4ZS"
                            target="_blank"
                            className="text-blue-600 hover:underline"
                        >
                            Postman Documentation
                        </a>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
                    <ul className="list-disc list-inside">
                        <li>Keep your contacts organized and up-to-date</li>
                        <li>Easily find the contact you need when you need it</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Get started today!</h2>
                    <p className="text-gray-700 mb-4">
                        The Contacts web application is free and easy to use. Sign up for an account today and start managing your contacts!
                    </p>
                    <div className="flex flex-row">
                    <Link to="/login" className="mr-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Signup</Button>
                    </Link>
                    </div>
                </section>
            </main>
            <footer className="text-center py-4 text-gray-500">
                <p>&copy; 2023</p>
            </footer>
        </Container>
    );
}

export default LandingPage;
