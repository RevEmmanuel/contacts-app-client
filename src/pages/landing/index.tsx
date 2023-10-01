import React from 'react';
import Container from "../../components/Container";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

interface IProps {
}

function LandingPage(props: IProps) {
  return (
    <Container>
        <header>
            <h1>Contacts Web Application</h1>
            <p>A simple and easy-to-use web application for managing your contacts.</p>
        </header>
        <main>
            <h1 className="text-3xl">Landing Page</h1>
            <section>
                <h2>Features</h2>
                <ul>
                    <li>Add, edit, and delete contacts</li>
                    <li>Search for contacts by name or phone number</li>
                    <a href="https://documenter.getpostman.com/view/24879226/2s9YJaZ4ZS" target="_blank">Postman Documentation</a>
                </ul>
            </section>
            <section>
                <h2>Benefits</h2>
                <ul>
                    <li>Keep your contacts organized and up-to-date</li>
                    <li>Easily find the contact you need when you need it</li>
                </ul>
            </section>
            <section>
                <h2>Get started today!</h2>
                <p>The Contacts web application is free and easy to use. Sign up for an account today and start managing your contacts!</p>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            </section>
        </main>
        <footer>
            <p>Copyright &copy; 2023</p>
        </footer>
    </Container>
  );
}

export default LandingPage;
