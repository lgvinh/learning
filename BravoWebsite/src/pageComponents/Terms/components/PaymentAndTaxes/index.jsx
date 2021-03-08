import React from 'react';

const PaymentAndTaxes = () => (
  <section>
    <hr className="hr" />
    <h3 className="rule">2. Payment and Taxes</h3>
    <div className="terms__content">
      <p className="clause">2.1. Payment Terms. </p>
      <p>
        Customer shall pay all invoices within thirty (30) days of date of invoice, without any
        deduction or set-off (except for any amount disputed promptly and in writing by Customer
        in good faith), and payment will be sent to the address specified by bravoSUITE. Any
        amounts arising in relation to this Agreement not paid when due will be subject to a late
        charge of one and one-half percent (1 1/2 %) per month on the unpaid balance or the
        maximum rate allowed by law, whichever is less. Without prejudice to Customer’s rights
        set out elsewhere in this Agreement, all SaaS Products fees are non-refundable and
        payable in advance. bravoSUITE may invoice for purchases of SaaS Products upon delivery.
      </p>
      <p className="clause">2.2. Taxes.</p>
      <p>
        The fees and charges covered by this Agreement are exclusive of any excise, sales, use,
        gross-turnover, value added, goods and services tax or other similar types of indirect
        taxes, duties or tariffs (however designated, levied or based and whether foreign or
        domestic) (
        <span className="bold">“Indirect Taxes”</span>
        ) imposed or levied, currently or in the future based on applicable legislation, on the
        SaaS Products provided under this Agreement. Unless otherwise agreed between the Parties,
        Customer will be liable for compliance with and payment of such Indirect Taxes.
        bravoSUITE shall include the Indirect Taxes on its invoice to Customer and remit such
        Indirect Taxes to the relevant authority if required by applicable law. For the avoidance
        of doubt, bravoSUITE will be responsible for direct taxes imposed on bravoSUITE’s net
        income or gross receipts.
      </p>
      <p className="clause">2.3. Indirect Orders.</p>
      <p>
        If Customer places an order for the SaaS Products from bravoSUITE’s Authorized Channel
        Partner of Customer’s choosing pursuant to an independent commercial agreement (“
        <span className="bold">Indirect Order</span>
        {' '}
        ”), then bravoSUITE grants the rights
        described in this Agreement in consideration for and subject to (a) Customer’s agreement
        to comply with the pricing and payment terms of the Indirect Order, to be separately
        agreed between Customer and bravoSUITE’s Authorized Channel Partner, and (b) Customer’s
        agreement to comply with its obligations set forth in this Agreement (including the
        restrictions on use of the SaaS Products). Notwithstanding the foregoing, the final sales
        price or rate shall be freely and independently determined between that channel partner
        and Customer. For the avoidance of doubt, in the case of such an Indirect Order, any
        indication in this Agreement of an agreement between Customer and bravoSUITE for the
        price payable by Customer for such Indirect Order shall be null and void and not form a
        binding part of this Agreement and the provisions of this Agreement related to payment
        terms, pricing, and/or order procedures shall not apply.
      </p>
    </div>
  </section>
);

export default PaymentAndTaxes;