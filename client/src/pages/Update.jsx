import React from 'react'
import Form from '../components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/index';
import { toast } from 'react-toastify';

const Update = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['recipe'],
        queryFn: () => api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found)
    })

    const { isLoading, mutate } = useMutation({
        mutationFn: (updateData) => api.patch(`/api/v1/recipes/${id}`, updateData),

        onSuccess: () => {
            toast.success('Güncelleme işlemi başarılı')
            navigate(`/`)
        },

        onError: () => {
            toast.success('Bir hata oluştu')
        },

    })

    return (
        <div>
            <h1 className="text-red-400 text-3xl font-bold">
                Tarifi Düzenle
            </h1>

            <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
        </div>
    )
}

export default Update