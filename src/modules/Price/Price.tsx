import * as S from './styled';
import Text from '@/components/Text';
import {
  IPrice,
  IPriceSection,
  IPriceTooltip,
  MOCKUP_PRICE_PARAMS,
  PRICES,
  PriceType,
} from '@/modules/Price/constants';
import { Row } from '@/components/Row';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import Button from '@/components/Button';
import { Tooltip } from 'antd';
import { Info } from 'react-feather';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';
import client from '@/services/client';
import formatter from '@/utils/amount';
import convert from '@/utils/convert';
import BigNumber from 'bignumber.js';
import { Spinner } from '@/components/Spinner';
import { ModalsContext } from '@/contexts/modals.context';

interface ISetPrices {
  [PriceType.ESSENTIALS]: undefined | string;
  [PriceType.PROFESSIONAL]: undefined | string;
}

const Price = () => {
  const navigate = useNavigate();
  const { toggleContact } = useContext(ModalsContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [prices, setPrices] = React.useState<ISetPrices>({
    [PriceType.ESSENTIALS]: undefined,
    [PriceType.PROFESSIONAL]: undefined,
  });

  const renderTooltipContent = (item: IPriceSection) => {
    return (
      <Row wrap="nowrap" gap={12}>
        <IconSVG src={`${configs.CDN_APP_ICON_URL}/check-circle-1.svg`} maxWidth="14" />
        <Row gap={4}>
          <Text size="16">
            {item.title && <S.SpanHighlight>{item.title}: </S.SpanHighlight>} {item.content}
          </Text>
          {item.tooltip && renderTooltip(item.tooltip)}
        </Row>
      </Row>
    );
  };

  const renderTooltip = (item: IPriceTooltip | string) => {
    return (
      <span>
        <Tooltip
          overlayStyle={{ maxWidth: '450px' }}
          title={
            <S.TooltipContent>
              {typeof item === 'string' ? (
                <Text size="14" color="text_primary">
                  {item}
                </Text>
              ) : (
                <div className="tooltip-content">
                  <Text size="18" color="text_primary" fontWeight="semibold" className="title">
                    {item.title}
                  </Text>
                  {typeof item.contents === 'string' ? (
                    <Text size="18" color="text_primary" className="title">
                      {item.title}
                    </Text>
                  ) : (
                    (item.contents || []).map(renderTooltipContent)
                  )}
                </div>
              )}
            </S.TooltipContent>
          }
          placement="bottom"
          color="white"
        >
          <Info size={16} cursor="pointer" />
        </Tooltip>
      </span>
    );
  };

  const renderSection = (item: IPriceSection, index: number) => {
    return (
      <Row
        wrap="nowrap"
        gap={12}
        className={`${index === 0 || index === 2 ? `card-section-${index}` : ''} ${
          !item.title && !item.content && 'hidden'
        } card-section horizontal-padding`}
      >
        <Row gap={8}>
          <Text size="16">
            {item.title && <S.SpanHighlight>{item.title} </S.SpanHighlight>} {item.content || ''}
          </Text>
          {item.tooltip && renderTooltip(item.tooltip)}
        </Row>
      </Row>
    );
  };

  const renderCard = (item: IPrice) => {
    return (
      <S.Card key={item.id} isFocus={item.priceType === PriceType.ESSENTIALS}>
        {!!item.type && <S.CardHeader className={`header_${item.id} `}>{item.type}</S.CardHeader>}
        {loading ? (
          <Spinner size={16} className="ml-32" />
        ) : (
          <Text size="32" fontWeight="semibold" className={`mt-24 ${item.hidePrice && 'hidden'} horizontal-padding`}>
            {(prices as any)[item.priceType] ? (prices as any)[item.priceType] : item.price}
            <span className="unit">{item.unit}</span>
          </Text>
        )}
        <Text size="14" className={`${!item.setupCost && 'hidden'} horizontal-padding`} color="text_secondary">
          (Setup cost: {item.setupCost || 'Unknow'})
        </Text>
        <Text size="18" fontWeight="medium" className="mt-12">
          {item.subType}
        </Text>
        <S.CardSection className="mt-24">{item.sections.map(renderSection)}</S.CardSection>
        <div className="horizontal-padding">
          <Button
            className={`action ${!item.actionLabel && 'hidden'}`}
            sizes="stretch"
            onClick={() => {
              if (!item.actionLabel) return;
              if (item.priceType === PriceType.ENTERPRISE) {
                toggleContact();
              } else {
                navigate(ROUTE_PATH.BUY + `/?type=${item.priceType}/`);
              }
            }}
          >
            {item.actionLabel || 'Empty'}
          </Button>
        </div>
      </S.Card>
    );
  };

  const fetchPrice = async () => {
    try {
      setLoading(true);
      const tasks = [
        await client.orderBuyEstimateAPI((MOCKUP_PRICE_PARAMS as any)[PriceType.ESSENTIALS]),
        await client.orderBuyEstimateAPI((MOCKUP_PRICE_PARAMS as any)[PriceType.PROFESSIONAL]),
      ];
      const [essentials, professional] = await Promise.all(tasks);
      if (essentials && essentials.TotalCost !== '0' && professional && professional.TotalCost !== '0') {
        const essentialsFormated = convert.toNumber({
          text: formatter.shorterAmount({
            originalAmount: essentials.TotalCost,
            decimals: 18,
          }),
        });
        const professionalFormated = convert.toNumber({
          text: formatter.shorterAmount({
            originalAmount: professional.TotalCost,
            decimals: 18,
          }),
        });
        setPrices({
          [PriceType.ESSENTIALS]: new BigNumber(essentialsFormated).decimalPlaces(0).toNumber() + ' BVM',
          [PriceType.PROFESSIONAL]: new BigNumber(professionalFormated).decimalPlaces(0).toNumber() + ' BVM',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <S.Container>
      <Text size="24" fontWeight="semibold" align="center">
        Plans built for every team
      </Text>
      <Text size="52" fontWeight="bold" align="center" className="mt-24">
        Developer-first pricing
      </Text>
      <div style={{ overflow: 'auto' }}>
        <S.Grid>{PRICES.map(renderCard)}</S.Grid>
      </div>
      <Text size="16" className="note" color="text_secondary" align="center">
        <strong>Note:</strong> The monthly fees are estimated; actual monthly fees can vary depending on the number of
        transactions in your blockchain, the Bitcoin fee rate, and the rate of BTC and BVM
      </Text>
    </S.Container>
  );
};

export default Price;
