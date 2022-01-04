//@ts-nocheck

export class APIFeatures {
    query
    queryString
    constructor(query: any, queryString: any) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObj = { ...this.queryString }
        const exludedFields = ['sort', 'page', 'limit', 'fields']

        for (let prop in queryObj) {
            if (exludedFields.includes(prop)) {
                delete queryObj[prop]
            }
        }

        let queryString = JSON.stringify(queryObj)
        const regex = /\b(gte|gt|lte|lt)\b/g

        queryString = queryString.replace(regex, (match) => `$${match}`)
        queryString = JSON.parse(queryString)

        for (let prop in queryString) {
            queryString[prop] = {
                $in: [...queryString[prop].split('or')],
            }
            const newProp = prop.replace(',', '.')
            const obj = { [newProp]: queryString[prop] }

            delete queryString[prop]

            queryString = { ...queryString, ...obj }
        }
        this.query = this.query.find(queryString)

        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    limitFields() {
        const { fields } = this.queryString
        const v = '-__v'

        if (fields) {
            const fieldList = fields.split(',').join(' ')
            this.query = this.query.select(fieldList)
        } else {
            this.query = this.query.select(v)
        }

        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 20
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}
