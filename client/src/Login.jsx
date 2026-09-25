
function Login({ onLogin, onSignup }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Invalid email or password"
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful! 🎉");

      onLogin(data.user);
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-glow"></div>

      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">
            🍴
          </div>

          <h1>Smart Canteen</h1>

          <p>
            SMART • FAST • CONVENIENT
          </p>
        </div>

        <div className="login-card">

          <div className="login-card-header">
            <span className="login-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Login to your account
            </h2>

            <p>
              Order food, track your
              orders and skip the queue.
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="login-field">
              <label>
                Email Address
              </label>

              <div className="login-input-wrapper">
                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>
                Password
              </label>

              <div className="login-input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
            >
              Login
              <span>→</span>
            </button>

            <button
  type="button"
  className="back-home-btn"
  onClick={() => window.location.reload()}
>
  ← Back to Smart Canteen
</button>

          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-signup">
            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() => onSignup()}
            >
              Create Account
            </button>
          </div>

        </div>

        <p className="login-footer">
          🍴 Smart Canteen • Campus
          Food Ordering
        </p>

      </div>
    </div>
  );
}

export default Login;
