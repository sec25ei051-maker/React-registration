import { useState } from "react";
import "./App.css";

function App() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("Register button clicked");

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "https://react-registration-zes3.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        confirmPassword
                    })
                }
            );

            const result = await response.json();

            console.log("Backend response:", result);

            if (response.ok) {
                alert("Account created successfully!");

                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                alert(result.message || "Registration failed");
            }

        } catch (error) {
            console.error("Registration error:", error);
            alert("Cannot connect to server");
        }
    };

    return (
        <div className="app">

            <div className="register-container">

                <h1>TaskMate</h1>

                <h2>Create Account</h2>

                <p className="subtitle">
                    Plan, Focus, Achieve
                </p>

                <form onSubmit={handleRegister}>

                    {/* Username */}
                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Confirm Password */}
                    <label>Confirm Password</label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    {/* Register Button */}
                    <button type="submit">
                        Register
                    </button>

                </form>

                <p className="login-text">
                    Already have an account?
                    <span> Login</span>
                </p>

            </div>

        </div>
    );
}

export default App;