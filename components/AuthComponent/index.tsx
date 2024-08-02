import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from "@/components/buttons.component";

export default function Home() {
    return (
        <main

        >
            <div>
                <LoginButton />
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />

            </div>
        </main>
    );
}