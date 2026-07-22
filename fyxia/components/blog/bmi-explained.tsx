export default function Content() {
  return (
    <>
      <p>
        BMI — Body Mass Index — is probably the most-quoted health number
        that almost nobody can explain the origin of. It&rsquo;s on every
        doctor&rsquo;s chart and every fitness app, but it was never
        actually designed to do most of the things it&rsquo;s used for
        today.
      </p>

      <h2>The formula</h2>
      <p>
        BMI is deliberately simple — just two inputs, height and weight:
      </p>
      <blockquote>BMI = weight (kg) / height (m)&sup2;</blockquote>
      <p>
        In imperial units, the equivalent is weight (lb) &times; 703 /
        height (in)&sup2;. Both give the same result — it&rsquo;s purely a
        unit conversion.
      </p>
      <p>The standard World Health Organization ranges are:</p>
      <ul>
        <li>Below 18.5 — Underweight</li>
        <li>18.5–24.9 — Healthy weight</li>
        <li>25–29.9 — Overweight</li>
        <li>30 and above — Obese</li>
      </ul>

      <h2>Where it came from</h2>
      <p>
        The formula dates back to the 1830s, developed by Belgian
        mathematician Adolphe Quetelet — not as a health metric at all, but
        as a way to describe the &ldquo;average man&rdquo; for population
        statistics. It wasn&rsquo;t repurposed as an individual health
        screening tool until over a century later, in the 1970s, largely
        because it was cheap and fast to calculate at scale — no calipers,
        no scans, just a scale and a tape measure.
      </p>

      <h2>What it doesn&rsquo;t account for</h2>
      <p>
        This is the core limitation, and it&rsquo;s a real one: BMI
        measures the relationship between height and total weight — it has
        no way of knowing whether that weight is muscle, fat, bone density,
        or water.
      </p>
      <ul>
        <li>
          <strong>Muscle mass</strong> — a muscular athlete can have a
          &ldquo;high&rdquo; BMI despite very low body fat, since muscle is
          denser than fat.
        </li>
        <li>
          <strong>Body fat distribution</strong> — BMI treats a kilogram of
          fat around the waist the same as a kilogram of fat elsewhere,
          even though where fat is stored matters for health risk.
        </li>
        <li>
          <strong>Age and sex</strong> — the same BMI can reflect different
          body compositions in a 25-year-old versus a 65-year-old, or
          between men and women, due to natural differences in muscle and
          fat ratios.
        </li>
        <li>
          <strong>Frame size</strong> — it doesn&rsquo;t distinguish between
          someone with a naturally larger or smaller bone structure.
        </li>
      </ul>

      <h2>So what is it actually good for?</h2>
      <p>
        BMI remains genuinely useful as a{" "}
        <strong>population-level screening tool</strong> — it&rsquo;s a
        fast, free, reasonably reliable way to flag when someone&rsquo;s
        weight relative to height is worth a closer look, especially across
        large groups or general check-ups. Its correlation with health risk
        holds up reasonably well in aggregate, across thousands of people.
      </p>
      <p>
        What it isn&rsquo;t is a diagnosis. A single BMI number, for one
        person, doesn&rsquo;t tell the whole story — it&rsquo;s a starting
        point for a conversation with a doctor, not an endpoint. Measures
        like waist circumference, body fat percentage, and overall fitness
        give a much fuller picture for an individual.
      </p>

      <p>
        You can check your own number with the{" "}
        <a href="/tools/bmi-calculator">BMI Calculator</a> — just remember
        to read the result as one data point, not a verdict.
      </p>
    </>
  );
}
