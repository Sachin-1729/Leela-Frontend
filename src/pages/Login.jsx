import { useState } from "react";
import { signin } from "../api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
   const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    try {
     
        const response = await signin(data);
        console.log(response)
        const {user , token} = response.data;
        toast.success("Login successfull");
        login(token , user)
        if(response.data)
        {
            navigate("/leads");
        }

        

      // Example:
      // localStorage.setItem("token", result.token);
      // window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
      toast.error("Wrong phone or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        fontFamily: '"Nunito Sans", "Inter", sans-serif',
        background:
          "linear-gradient(135deg, #24132f 0%, #3a1f47 50%, #1f1229 100%)",
      }}
    >
      <div
        className="w-full max-w-md p-8"
        style={{
          background: "#321d3d",
          border: "1px solid rgba(190, 170, 210, 0.18)",
          borderRadius: "22px",
          boxShadow: "0 10px 40px rgba(20, 8, 30, 0.25)",
        }}
      >
        <div className="mb-8">
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ color: "#fff8ef" }}
          >
            Welcome back
          </h1>

          <p className="text-sm" style={{ color: "#b9a6c5" }}>
            Login to continue to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold"
              style={{ color: "#fff8ef" }}
            >
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-3 outline-none transition"
              style={{
                background: "#281732",
                color: "#fff8ef",
                border: "1px solid rgba(190, 170, 210, 0.2)",
                borderRadius: "13px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold"
              style={{ color: "#fff8ef" }}
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 outline-none transition"
              style={{
                background: "#281732",
                color: "#fff8ef",
                border: "1px solid rgba(190, 170, 210, 0.2)",
                borderRadius: "13px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 font-bold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            style={{
              background: "#f4c95d",
              color: "#24132f",
              borderRadius: "13px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}