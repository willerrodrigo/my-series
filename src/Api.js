import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadGenres: () => api.get('genres'),
    saveSeries: (NewSeries) => api.post('series', NewSeries),
    updateSeries: (series) => api.put('series/'+series.id, series),
    loadSeriesByGenre: (genre) => api.get('series?genre='+genre),
    deleteSeries: (id) => api.delete('series/'+id),
    loadSeriesById: (id) => api.get('series/'+id)
}

export default apis