import * as Avatar from '@radix-ui/react-avatar'

interface AvatarProps {
  src?: string | null // URL da imagem
  alt?: string // Texto alternativo para a imagem
  fallbackText?: string // Texto de fallback caso a imagem não carregue
}

const AvatarComponent = ({ src, alt, fallbackText }: AvatarProps) => (
  <Avatar.Root className='inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle'>
    {src && (
      <Avatar.Image
        className='h-full w-full rounded-[inherit] object-cover'
        src={src}
        alt={alt}
      />
    )}
    <Avatar.Fallback
      className='leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-violet11'
      delayMs={600}
    >
      {fallbackText || alt?.[0]}
    </Avatar.Fallback>
  </Avatar.Root>
)

export default AvatarComponent
