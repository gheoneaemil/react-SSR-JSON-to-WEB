import { Suspense } from 'react';
import { generateDesign } from '../data/generator';

function Albums() {
  console.log("Server?");
  const design = generateDesign();
  console.log("Albums: ", design);
  return design;
}

export default async function Page() {
  console.log("Server??");
  return (
    <Suspense fallback="Getting design">
      <Albums />
    </Suspense>
  );
}
