import { Card } from '@edifice-ui/react';

export const Icons = ({ icons }: { [key: string]: any }) => {
  const odeIcons = { ...icons };

  return (
    <div className="grid">
      {Object.keys(odeIcons).map((item, index) => {
        const Icon: any = odeIcons[item];
        return (
          <Card
            key={index}
            isSelectable={false}
            isClickable={false}
            className="g-col-6 g-col-md-2"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.8rem',
              alignItems: 'center',
              justifyContent: 'center',
              height: '12rem',
            }}
          >
            <Icon />
            <p style={{ marginBottom: 0 }}>
              <strong
                style={{
                  fontSize: '1.2rem',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item}
              </strong>
            </p>
          </Card>
        );
      })}
    </div>
  );
};
