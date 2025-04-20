import { Suspense } from 'react';
import { generateDesign } from '../data/generator';

async function Albums() {
  console.log("Server?");
  const design = await generateDesign();
  console.log("Albums: ", design);
  return (
    <p>
      Data is: {JSON.stringify(design)}
    </p>
  );
}

export default async function Page() {
  console.log("Server??");
  return (
    <>
      <h1 className="text-3xl mb-3">Spotifn’t</h1>
      <Suspense fallback="Getting albums">
        {/* @ts-expect-error 'Promise<Element>' is not a valid JSX element. */}
        <Albums />
      </Suspense>
    </>
  );
}
