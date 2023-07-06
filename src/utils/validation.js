const validateNew = (isNew) => {
    try {
        if (!isNew) {
            throw new Error('new 키워드를 붙여주세요!')
        }
    } catch (e) {
        console.log(e.message)
    }
}

const vaildateArray = (datas) => {
    if (!Array.isArray(datas)) {
        throw new Error('배열 형식이 아닙니다!')
    }
}

const validateString = (data) => {
    const { title, content } = data

    if (typeof title !== 'string' || typeof content !== 'string') {
        throw new Error('문자열로 작성해주세요!')
    }
}

export { vaildateArray, validateNew, validateString }
