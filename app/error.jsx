"use client";

// NOTE: This error boundary component deos NOT catch any errors from the RootLayout.
// If we wanted to catch any error from the RootLayout, the  we will have to create another file called 'global-error.js', but this one would replace the entire layout. Therefore, we would have to add 'html' and 'body' tags in that file as well.
export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
