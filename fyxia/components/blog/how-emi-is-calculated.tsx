export default function Content() {
  return (
    <>
      <p>
        Every loan with a fixed monthly payment — a car loan, a personal
        loan, a mortgage — uses the same underlying formula to work out that
        payment: the EMI, or Equated Monthly Instalment. It looks
        intimidating the first time you see it, but the logic behind it is
        straightforward once you break it into pieces.
      </p>

      <h2>The formula</h2>
      <p>The standard EMI formula is:</p>
      <blockquote>EMI = P &times; r &times; (1 + r)&#8319; / [(1 + r)&#8319; &minus; 1]</blockquote>
      <p>Where:</p>
      <ul>
        <li>
          <strong>P</strong> is the principal — the amount you actually
          borrowed
        </li>
        <li>
          <strong>r</strong> is the monthly interest rate (your annual rate
          divided by 12, then divided by 100)
        </li>
        <li>
          <strong>n</strong> is the total number of monthly payments (loan
          term in years &times; 12)
        </li>
      </ul>
      <p>
        The result is a single fixed number that stays the same every month
        for the life of the loan — which is exactly what makes it
        &ldquo;equated.&rdquo;
      </p>

      <h2>Why the payment doesn&rsquo;t change, but the split does</h2>
      <p>
        This is the part that surprises most people: even though your
        monthly payment is fixed, the mix of{" "}
        <em>how much of it is interest versus principal</em> shifts every
        month.
      </p>
      <p>
        Early in the loan, your outstanding balance is at its highest, so
        the interest portion of that month&rsquo;s payment is largest —
        meaning a smaller share actually reduces what you owe. As the
        balance goes down over time, less of each payment is eaten by
        interest, and more goes toward principal. By the final year of a
        long loan, almost the entire payment is principal.
      </p>
      <p>
        This is why paying off a loan a few years early saves more interest
        than the same extra payment would in the loan&rsquo;s final years —
        you&rsquo;re cutting into the balance while the interest portion is
        still large.
      </p>

      <h2>A worked example</h2>
      <p>
        Take a loan of Rs 2,000,000 at 14% annual interest over 5 years.
      </p>
      <ul>
        <li>Monthly rate: 14% &divide; 12 = 1.1667%</li>
        <li>Number of payments: 5 &times; 12 = 60</li>
        <li>
          Plugging into the formula gives an EMI of roughly{" "}
          <strong>Rs 46,530</strong> per month
        </li>
      </ul>
      <p>
        Over 60 months, that&rsquo;s about Rs 2,791,800 paid in total —
        meaning roughly Rs 791,800 of it is interest, not principal. That
        gap between what you borrow and what you repay is the real cost of
        borrowing, and it grows fast with either a higher rate or a longer
        term.
      </p>

      <h2>What actually moves your EMI</h2>
      <ul>
        <li>
          <strong>Loan term</strong> — a longer term lowers your monthly
          payment but increases total interest paid, since the balance
          stays outstanding (and accruing interest) for longer.
        </li>
        <li>
          <strong>Interest rate</strong> — even a 1–2% difference compounds
          significantly over a multi-year term.
        </li>
        <li>
          <strong>Principal</strong> — scales the EMI roughly linearly, all
          else being equal.
        </li>
      </ul>

      <p>
        Rather than run the formula by hand, the{" "}
        <a href="/tools/loan-calculator">Loan / EMI Calculator</a> computes
        your instalment instantly and shows the full year-by-year
        principal-versus-interest breakdown, so you can see exactly how your
        specific loan pays down over time.
      </p>
    </>
  );
}
