import "./globals.css";

export const metadata = {
  title: "Mck3nz1e Test App",
  description: "Testing CI/CD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
