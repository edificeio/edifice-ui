import { Meta, StoryObj } from '@storybook/react';
import useImageResizer from './useImageResizer';
import docs from './useImageResizer.mdx';
import { useEffect, useState } from 'react';
import { FormControl, Image, Input, Label } from '../../components';
import { customSize } from '../../utils/fileSize';

const meta: Meta<typeof useImageResizer> = {
  title: 'Hooks/useImageResizer',
  parameters: {
    docs: { page: docs },
  },
};

export default meta;
type Story = StoryObj<typeof useImageResizer>;

export const Example: Story = {
  render: (args) => {
    const [fileSize, setfileSize] = useState(0);
    const [resizedFileSize, setResizedFileSize] = useState(0);
    const [maxSize, setMaxSize] = useState(1440);
    const [quality, setQuality] = useState(80);
    const [file, setFile] = useState<File | undefined>();
    const [imgSrc, setImgSrc] = useState('');
    const { resizeImageFile } = useImageResizer();

    useEffect(() => {
      if (file) {
        setfileSize(file.size);
        resizeImageFile(file, maxSize, maxSize, 'jpeg', quality).then(
          (resizedImageFile) => {
            setImgSrc(URL.createObjectURL(resizedImageFile));
            setResizedFileSize(resizedImageFile.size);
          }
        );
      }
    }, [file, maxSize, maxSize, quality]);

    function handleImageOnChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files?.[0]) {
        setFile(event.target.files[0]);
      }
    }

    return (
      <>
        <div>
          <strong>1. Upload an image</strong>
        </div>
        <input type="file" accept="images/*" onChange={handleImageOnChange} />

        {!!file && (
          <>
            <div className="mt-16">
              <strong>2. Change it size and compression level</strong>
            </div>
            <div className="d-flex flex-row gap-16">
              <FormControl id="maxSize">
                <Label>Max size in px (default 1440)</Label>
                <Input
                  size="md"
                  type="number"
                  placeholder="Max size in px (default 1440)"
                  value={maxSize}
                  onChange={(event) => {
                    setMaxSize(Number(event.target.value));
                  }}
                />
              </FormControl>
              <FormControl id="maxSize">
                <Label>Compression level (default 80%)</Label>
                <Input
                  size="md"
                  type="number"
                  placeholder="Compression level (default 80%)"
                  value={quality}
                  min={10}
                  max={100}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                  }}
                />
              </FormControl>
            </div>
            <div className="mt-16">
              <strong>Resized Image:</strong>
            </div>
            <div>
              Original file size: {customSize(fileSize || 0, 1)} / Resized file
              size: {customSize(resizedFileSize || 0, 1)}
            </div>
            <Image alt="" src={imgSrc} />
          </>
        )}
      </>
    );
  },
};
