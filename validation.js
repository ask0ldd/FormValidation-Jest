class validationHelper {

    static nameRegex = new RegExp ("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
    static zeroNinetyNineRegex = new RegExp ("^[0-9]{1,2}$")
    static emailRegex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$")
    static dateRegex = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$")

    static checkName(fieldValue)
    {
        return this.nameRegex.test(fieldValue.trim())
    }

    static checkDate(fieldValue)
    {
        return this.dateRegex.test(fieldValue.trim())
    }

    static checkNumber(fieldValue)
    {
        return this.zeroNinetyNineRegex.test(fieldValue)
    }
}

module.exports = validationHelper