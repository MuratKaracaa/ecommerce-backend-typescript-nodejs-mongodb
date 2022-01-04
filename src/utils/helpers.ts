import moment from 'moment'
import { Model } from 'mongoose'
import { clicks } from '../types'
moment.suppressDeprecationWarnings = true

export const calculateTokenExpiration = (
    issuedAt: number,
    expiresIn: string
) => {
    const integer = parseInt(expiresIn)
    const durationType = expiresIn.charAt(expiresIn.length - 1)
    const parsedValue = []
    parsedValue.push(integer, durationType)
    const expiresAt = moment(issuedAt)
        .add(...parsedValue)
        .valueOf()
    return expiresAt
}

export const click = async <T>(
    model: Model<T>,
    id: String,
    fieldName: String
) => {
    const date = moment().format('YYYY-MM-DD')
    const day = new Date().toLocaleDateString('tr-TR', { weekday: 'long' })
    const month = new Date().toLocaleDateString('tr-TR', { month: 'long' })
    const clickObj = {
        date,
        day,
        month,
        count: 1,
    }
    const objectToUpdate = await model.findById(id).orFail()
    //@ts-ignore
    const { [fieldName]: field } = objectToUpdate
    const incrementProp = `${fieldName}.$[el].count`
    const dayExists = field.some((el: any) => el.date === date)
    if (dayExists) {
        await objectToUpdate.updateOne(
            //@ts-ignore
            { $inc: { [incrementProp]: 1 } },
            {
                arrayFilters: [{ 'el.date': date }],
                new: true,
            }
        )
    } else {
        await objectToUpdate.updateOne(
            //@ts-ignore
            { $push: { [fieldName]: clickObj } },
            { new: true }
        )
    }
}

export const filterClicksByDate = (
    array: [],
    last?: string,
    start?: string,
    end?: string
) => {
    if (last) {
        return array.filter((el: any) => moment(el.date) >= moment(last))
    } else if (start && end) {
        return array.filter(
            (el: any) =>
                moment(el.date) >= moment(start) &&
                moment(el.date) <= moment(end)
        )
    }
}

export const transformToDate = (limit: string) => {
    const int: number = parseInt(limit)
    const regex = /(d)|(w)|(y)/g
    const period = limit
        .match(regex)
        ?.filter(
            (el) => el !== undefined
        ) as unknown as moment.unitOfTime.DurationConstructor
    const date = moment(new Date())
        .add(-+int + 1, period)
        .toDate()
        .toDateString()
    return date
}

export const generateOrderCode = (length: Number = 8) => {
    let code = ''
    const alphabetLower = new Array(26)
        .fill(1)
        .map((_, i) => String.fromCharCode(97 + i))

    const alphabetUpper = new Array(26)
        .fill(1)
        .map((_, i) => String.fromCharCode(65 + i))

    const numbers = new Array(10).fill(1).map((el, i) => i++)

    const alphaNumericAlphabet = [
        ...alphabetLower,
        ...alphabetUpper,
        ...numbers,
    ]
    for (let i = 0; i <= length; i++) {
        code +=
            alphaNumericAlphabet[
                Math.floor(Math.random() * alphaNumericAlphabet.length)
            ]
    }
    return code
}

export const calculateTotalClicks = (clickArray: clicks) => {
    if (clickArray.length > 0) {
        return clickArray
            .flat()
            .map((el) => el.count)
            .reduce((a, b) => a + b)
    } else {
        return 0
    }
}
