import Link from "next/link";
import flagsmith from "./utils/flagsmith";

export const revalidate = 0;

export default async function Home() {
  const flags = await flagsmith.getEnvironmentFlags();
  return (
    <main className="main">
      <div>
        <h2>Hello World</h2>
        <p>This is a test</p>
        <p>This is also a test</p>
      </div>
      <Link href="/about">About</Link>
      <br />
      {flags.isFeatureEnabled("search") && <input placeholder="Search" />}
    </main>
  );
}
