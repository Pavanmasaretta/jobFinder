const URL = import.meta.env.VITE_BACKEND_URL;
export async function register({ name, mobile, password, email }) {
    try {
        const res = await fetch(`${URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                mobile,
                password,
                email
            }),
        });

        const data = await res.json();
        const status = res.status;

        console.log(data , status);

        return { status, data };
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }
}
export async function login({ email, password }) {
    try {
        const res = await fetch(`${URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await res.json();
        const status = res.status;

        console.log(data , status);

        return { status, data };
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }
}
