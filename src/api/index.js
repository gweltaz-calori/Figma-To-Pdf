import axios from 'axios'

export const getFramePages = async (fileKey) => {
    let response = await axios.get(`/api/files/${fileKey}`)
    return response.data
}

export const createPdf = async (file) => {

    let response = await axios({
        url: `/api/export`,
        method: 'POST',
        responseType: 'blob',
        data: {
            file
        }
    })
    var blob = new Blob([response.data], { type: 'application/pdf' });;
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${file.name}.pdf`;
    link.click();

}