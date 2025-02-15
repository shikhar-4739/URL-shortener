import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Download, Trash } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const LinkCard = ({url, fetchUrls}) => {

    const downloadImage = () => {
        toast.info('QR Code Downloading');
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement('a');
        anchor.href = imageUrl; 
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    console.log(url);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://url-shortener-sepia-pi.vercel.app/${url?.short_url}`);
        toast.success('Link Copied!');
    }

    const handleDelete = async() => {
        try {
            await fnDelete();
            toast.success('URL Deleted Successfully');
            fetchUrls();
        } catch (error) {
            toast.error('Error Deleting URL');
        }
    }

    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url?.id);

  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
      <img src={url?.qr} className='h-32 object-contain ring ring-blue-500 self-start' alt='qr code' />

      <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
        <span className='text-3xl font-extrabold hover:underline cursor-pointer'>
            {url?.title}
        </span>
        <span className='text-2xl text-blue-400 hover:underline cursor-pointer font-bold'>
            https://snipurl.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className='flex items-center gap-1 hover:underline cursor-pointer'>
            {url?.original_url}
        </span>
        <span className='flex items-end font-extralight text-sm flex-1'>
            {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div>
        <Button 
            variant="ghost"
            onClick={handleCopyLink}
        >
            <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
            <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete} disabled={loadingDelete}>
            {loadingDelete ? <BeatLoader size={5} color='white' /> : <Trash />}
        </Button>
      </div>
    </div>
  )
}

export default LinkCard
