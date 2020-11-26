import { Perfume, PerfumeDetail } from "../index";

interface ArrSizes {
  [object: number]: Perfume
}

interface FilterPerfume extends PerfumeDetail {
  arrSizes: ArrSizes
}

export default FilterPerfume;
