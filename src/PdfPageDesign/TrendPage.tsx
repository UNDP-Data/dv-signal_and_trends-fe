/* eslint-disable jsx-a11y/anchor-is-valid */
import { Page, View, StyleSheet, Text, Link } from '@react-pdf/renderer';
import { WEB_ADDRESS } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';

// Create styles
const font = 'Helvetica';
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: `${font}-Bold`,
    color: '#006EB5',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: '12px',
    textAlign: 'left',
    fontFamily: font,
    marginBottom: 10,
    color: '#000',
  },
  subNote: {
    fontSize: '10px',
    textAlign: 'left',
    fontFamily: font,
    marginTop: 5,
    marginBottom: 10,
    color: '#999',
  },
  listText: {
    fontSize: '10px',
    textAlign: 'left',
    fontFamily: font,
    marginBottom: 10,
    color: '#000',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  linkText: {
    fontSize: '10px',
    textAlign: 'left',
    fontFamily: font,
    marginTop: 10,
    color: '#006EB5',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  insidePageSection: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  pageTitleBG: {
    padding: 10,
    backgroundColor: '#006EB5',
    width: 'calc(100% - 20px)',
  },
  pageBoxBG: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    backgroundColor: '#EAEAEA',
    width: 'calc(100% - 20px)',
  },
  pageTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: `${font}-Bold`,
    color: '#FFF',
  },
});

interface Props {
  data: TrendDataType;
  connectedSignalsForTrendsForPrinting: SignalDataType[];
}

export function TrendsPage(props: Props) {
  const { data, connectedSignalsForTrendsForPrinting } = props;
  return (
    <Page style={styles.page} orientation='landscape'>
      <View style={styles.insidePageSection}>
        <Text style={styles.title}>Trends</Text>
      </View>
      <View style={styles.insidePageSection}>
        <View style={styles.pageTitleBG}>
          <Text style={styles.pageTitle}>{data.headline}</Text>
        </View>
      </View>
      <View style={styles.insidePageSection}>
        <View
          style={{
            width: 'calc(33.33% - 10px)',
          }}
        >
          <Text style={styles.title}>Impact Rating</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2',
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#006EB5',
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  parseInt(data.impact_rating.split(' — ')[0], 10) > 1
                    ? '#006EB5'
                    : '#AAA',
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  parseInt(data.impact_rating.split(' — ')[0], 10) > 2
                    ? '#006EB5'
                    : '#AAA',
              }}
            />
          </View>
          <Text style={styles.subNote}>
            {data.impact_rating.split(' — ')[1]}
          </Text>
          <Text style={styles.title}>Horizon</Text>
          <Text style={styles.text}>{data.time_horizon}</Text>
          {data.connected_signals?.length === 0 ||
          data.connected_signals === null ? (
            <Text style={styles.title}>No signals in this trend</Text>
          ) : (
            <>
              <Text style={styles.title}>Most Recent 5 signals</Text>
              <View style={styles.pageBoxBG}>
                {data.connected_signals
                  .filter((_cs, i) => i < 5)
                  .map((cs, j) => (
                    <Link
                      src={`${WEB_ADDRESS}signals/${cs}`}
                      key={j}
                      style={styles.listText}
                    >
                      {
                        connectedSignalsForTrendsForPrinting[
                          connectedSignalsForTrendsForPrinting.findIndex(
                            c => `${c.id}` === `${cs}`,
                          )
                        ].headline
                      }
                    </Link>
                  ))}
              </View>
            </>
          )}
          <Text style={styles.title}>Last Updated</Text>
          <Text style={styles.text}>
            {data.modified_at
              ? data.modified_at.split('T')[0]
              : data.created_at.split('T')[0]}
          </Text>
          <Text style={styles.title}>Trend ID</Text>
          <Text style={styles.text}>{data.id}</Text>
        </View>
        <View
          style={{
            width: 'calc(66.66% - 10px)',
          }}
        >
          <Text style={styles.title}>Description</Text>
          <Text style={styles.text}>{data.description}</Text>
          <Text style={styles.title}>Impact on Development</Text>
          <Text style={styles.text}>{data.impact_description}</Text>
          <Link src={`${WEB_ADDRESS}trends/${data.id}`} style={styles.linkText}>
            View Details
          </Link>
        </View>
      </View>
    </Page>
  );
}
