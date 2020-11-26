interface PerfumeDetail {
	id: string,
	name: string,
	image: string
	price: number,
	description: string,
	style: string,
	gender: number,
	musk: string,
	lastLong: string,
	releasedAt: string,
	comeFrom: string,
	status: number,
	brandId: string
}

export default PerfumeDetail; 

// class PerfumeDetail {
// 	id: string;
// 	name: string;
// 	image: string;
// 	description: string;
// 	style: string;
// 	gender: number;
// 	musk: string;
// 	lastLong: string;
// 	releasedAt: string;
// 	comeFrom: string;
// 	status: number;
// 	brandId: string;
	
// 	constructor(data: any, method) {
// 		const { name, image, brandId, comeFrom, description, gender, lastLong, musk, style, releasedAt, id } = data;
// 		this.id = method === "post" ? uuid4() : id;
// 		this.name = name;
// 		this.image = image ? image : null;
// 		this.description = description ? description : null;
// 		this.style = style ? style : null;
// 		this.gender = gender ? gender: 2;
// 		this.musk = musk ? musk : null;
// 		this.lastLong = lastLong ? lastLong : null;
// 		this.releasedAt = releasedAt ? releasedAt : new Date().toISOString();
// 		this.comeFrom = comeFrom ? comeFrom : null;
// 		this.status = 1;
// 		this.brandId = brandId;
// 	}

// 	public getValue() : any {
// 		return {
// 			id: this.id,
// 			name: this.name,
// 			image: this.image,
// 			description: this.description,
// 			style: this.style,
// 			gender: this.gender,
// 			musk: this.musk,
// 			lastLong: this.lastLong,
// 			releasedAt: this.releasedAt,
// 			comeFrom: this.comeFrom,
// 			status: this.status,
// 			brandId: this.brandId
// 		};
// 	}
	
// 	public setValue(data: any) {
// 		const { name, image, brandId, comeFrom, description, gender, lastLong, musk, style, status } = data;
// 		if ( name ) this.name = name;
// 		if ( image ) this.image = image;
// 		if ( description ) this.description = description;
// 		if ( style ) this.style = style;
// 		if ( gender) this.gender = gender;
// 		if ( musk ) this.musk = musk;
// 		if ( lastLong) this.lastLong = lastLong;
// 		if ( comeFrom ) this.comeFrom = comeFrom;
// 		if ( status) this.status = status;
// 		if ( brandId ) this.brandId = brandId;
// 	}
	
// }

// export { Type_PerfumeDetail };