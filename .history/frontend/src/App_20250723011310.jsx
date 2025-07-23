import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <SignedOut>
        <SignIn path="/sign-in" routing="path" />
        <SignUp path="/sign-up" routing="path" />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <h1>Welcome to TrackedIn</h1>
      </SignedIn>
    </div>
  );
}

export default App;
