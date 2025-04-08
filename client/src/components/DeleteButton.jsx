import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from './../api/index';
import { toast } from 'react-toastify';
import { LoaderSm } from './Loader';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteButton = ({ productId }) => {

    const navigate = useNavigate()

    const { isLoading, mutate } = useMutation({
        mutationFn: () => api.delete(`/api/v1/recipes/${productId}`),

        onSuccess: () => {
            navigate('/')
            toast.success('Tarif Kaldırıldı')
        },

        onError: () => {
            toast.error('İşlem Başarısız!!')
        }
    })



    return (
        <button
            disabled={isLoading}
            onClick={mutate}
            className='btn flex gap-2 items-center bg-red-500 hover:bg-red-600 py-1 min-w-[90px] justify-center'
        >
            {
                isLoading ? (
                    <LoaderSm />
                ) : (
                    <>
                        <FaTrashAlt />
                        sil
                    </>
                )
            }
        </button>
    )
}

export default DeleteButton