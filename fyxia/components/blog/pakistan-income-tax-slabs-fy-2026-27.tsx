export default function Content() {
  return (
    <>
      <p>
        If you&rsquo;re salaried in Pakistan, income tax isn&rsquo;t a flat
        percentage — it&rsquo;s a set of progressive slabs, where each
        portion of your income is taxed at a different rate. Here&rsquo;s
        how the FY 2026-27 (Tax Year 2027) slabs work, effective from 1 July
        2026, and how to actually read them.
      </p>

      <h2>The salaried slabs for FY 2026-27</h2>
      <table>
        <thead>
          <tr>
            <th>Annual taxable income</th>
            <th>Tax rate on the portion in this slab</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Up to Rs 600,000</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>Rs 600,001 – 1,200,000</td>
            <td>1%</td>
          </tr>
          <tr>
            <td>Rs 1,200,001 – 2,200,000</td>
            <td>11%</td>
          </tr>
          <tr>
            <td>Rs 2,200,001 – 3,200,000</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>Rs 3,200,001 – 4,100,000</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>Rs 4,100,001 – 5,600,000</td>
            <td>29%</td>
          </tr>
          <tr>
            <td>Rs 5,600,001 – 7,000,000</td>
            <td>32%</td>
          </tr>
          <tr>
            <td>Above Rs 7,000,000</td>
            <td>35%</td>
          </tr>
        </tbody>
      </table>
      <p>
        The surcharge that previously applied on top of salaried income tax
        has been abolished for this tax year.
      </p>

      <h2>The part everyone gets wrong: it&rsquo;s progressive, not flat</h2>
      <p>
        A common misreading is assuming your entire income gets taxed at
        whichever bracket it falls into. That&rsquo;s not how it works.
        Only the <strong>portion of income within each bracket</strong> is
        taxed at that bracket&rsquo;s rate — everything below it was
        already taxed at the lower rates on the way up.
      </p>
      <p>
        So if your income lands in the 25% bracket, you are not paying 25%
        tax on your entire salary — you&rsquo;re paying 0% on the first Rs
        600,000, 1% on the next slice up to Rs 1,200,000, 11% on the slice
        after that, and so on, with 25% only applying to the portion that
        falls inside that specific bracket.
      </p>

      <h2>A worked example</h2>
      <p>
        Take an annual taxable salary of Rs 3,600,000 (Rs 300,000/month).
        That falls in the Rs 3,200,001–4,100,000 bracket, taxed at 25% on
        the portion above Rs 3,200,000.
      </p>
      <ul>
        <li>
          Tax on income up to Rs 3,200,000 (accumulated from the lower
          brackets): Rs 316,000
        </li>
        <li>
          Tax on the remaining Rs 400,000 (3,600,000 &minus; 3,200,000) at
          25%: Rs 100,000
        </li>
        <li>
          <strong>Total annual tax: Rs 416,000</strong> — about Rs 34,667 a
          month
        </li>
      </ul>
      <p>
        That works out to an <strong>effective rate</strong> of about 11.6%
        of total income — noticeably lower than the 25% &ldquo;marginal&rdquo;
        rate that applies to the top slice, which is exactly why the
        marginal rate and your real average tax rate are two different
        numbers.
      </p>

      <h2>Effective rate vs. marginal rate</h2>
      <p>
        Your <strong>marginal rate</strong> is the rate applied to your
        last rupee earned — useful for knowing how much of your next raise
        actually reaches you. Your <strong>effective rate</strong> is total
        tax divided by total income — the number that actually reflects
        your real tax burden. Higher earners will always have an effective
        rate meaningfully below their marginal rate, because of how the
        lower brackets stack underneath.
      </p>

      <p>
        Rather than working through the brackets manually, the{" "}
        <a href="/tools/income-tax-calculator">
          Pakistan Income Tax Calculator
        </a>{" "}
        computes both your monthly and annual tax, effective rate, and
        take-home pay instantly from either a monthly or annual salary
        input. As always with tax figures, it&rsquo;s worth cross-checking
        against the final FBR notification for the year before relying on
        any number for a filing.
      </p>
    </>
  );
}
