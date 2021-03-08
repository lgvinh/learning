import React from 'react';
import CopyRight from '../../components/Footer/Copyright';
import Information from '../../components/Footer/Information';
import TopNavigation from '../../components/HeaderNavigation';
import HelmetComponent from '../../components/Helmet';
import AccessAndUse from './components/AccessAndUse';
import Assignment from './components/Assignment';
import Confidentiality from './components/Confidentiality';
import Indemnification from './components/Indemnification';
import Info from './components/Info';
import LimitationOfLiability from './components/LimitationOfLiability';
import Miscellaneous from './components/Miscellaneous';
import PaymentAndTaxes from './components/PaymentAndTaxes';
import ProfessionalServices from './components/ProfessionalServices';
import RestrictedRightsAndExportControl from './components/RestrictedRightsAndExportControl';
import RightsInIntellectualProperty from './components/RightsInIntellectualProperty';
import SecurityAndProcessingOfPersonalData from './components/SecurityAndProcessingOfPersonalData';
import TermAndTermination from './components/TermAndTermination';
import Warranties from './components/Warranties';

const TermsPage = () => (
  <>
    <HelmetComponent title="Terms of service - BravoSUITE" />
    <TopNavigation type="special" />
    <div className="terms">
      <div className="terms__container">
        <Info />
        <AccessAndUse />
        <PaymentAndTaxes />
        <RightsInIntellectualProperty />
        <Confidentiality />
        <SecurityAndProcessingOfPersonalData />
        <Warranties />
        <Indemnification />
        <LimitationOfLiability />
        <Assignment />
        <RestrictedRightsAndExportControl />
        <ProfessionalServices />
        <TermAndTermination />
        <Miscellaneous />
      </div>
    </div>
    <Information />
    <CopyRight />
  </>
);

export default TermsPage;