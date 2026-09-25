
function Signup({ onSignup, onBackToLogin }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "student",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Registration failed"
        );
        return;
      }

      alert(
        "Account created successfully! 🎉"
      );

      onSignup();
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-background-glow"></div>

      <div className="signup-container">

        <div className="signup-brand">
          <div className="signup-logo">
            🍴
          </div>

          <h1>Smart Canteen</h1>

          <p>
            SMART • FAST • CONVENIENT
          </p>
        </div>

        <div className="signup-card">

          <div className="signup-card-header">
            <span className="signup-eyebrow">
              GET STARTED
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Join Smart Canteen and
              start ordering faster.
            </p>
          </div>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            <div className="signup-field">
              <label>
                Full Name
              </label>

              <div className="signup-input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="signup-field">
              <label>
                Email Address
              </label>

              <div className="signup-input-wrapper">
                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="signup-field">
              <label>
                Password
              </label>

              <div className="signup-input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  minLength="6"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="signup-submit"
            >
              Create Account
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

          <div className="signup-divider">
            <span>or</span>
          </div>

          <div className="signup-login">
            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onBackToLogin}
            >
              Login
            </button>
          </div>

        </div>

        <p className="signup-footer">
          🍴 Smart Canteen • Campus
          Food Ordering
        </p>

      </div>
    </div>
  );
}

export default Signup;
