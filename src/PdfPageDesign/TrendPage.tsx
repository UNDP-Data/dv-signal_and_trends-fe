/* eslint-disable jsx-a11y/anchor-is-valid */
import { Page, View, StyleSheet, Text, Link, Image } from '@react-pdf/renderer';
import { WEB_ADDRESS } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';

// Create styles
const font = 'Helvetica';
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  titleFirst: {
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: `${font}-Bold`,
    color: '#006EB5',
    marginTop: 0,
    marginBottom: 5,
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
          {data.attachment ? (
            <View
              style={{
                width: '100%',
                height: '150px',
              }}
            >
              <Image
                src={`data:${data.attachment}`}
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  margin: '0',
                }}
              />
            </View>
          ) : null}
          <Text style={styles.title}>Impact Rating</Text>
          {data.impact_rating ? (
            <>
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
                      parseInt(data.impact_rating?.split(' — ')[0], 10) > 1
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
                      parseInt(data.impact_rating?.split(' — ')[0], 10) > 2
                        ? '#006EB5'
                        : '#AAA',
                  }}
                />
              </View>
              <Text style={styles.subNote}>
                {data.impact_rating?.split(' — ')[1]}
              </Text>
            </>
          ) : (
            <Text style={styles.subNote}>Not Available</Text>
          )}
          <Text style={styles.title}>Horizon</Text>
          <Text style={styles.text}>{data.time_horizon}</Text>
          <Text style={styles.title}>STEEP+V</Text>
          {data.steep_primary ? (
            <>
              <Text style={styles.text}>
                {data.steep_primary.split(' – ')[0]}
              </Text>
              {data.steep_secondary
                ?.filter(d => d !== data.steep_primary)
                .map((d, i) => (
                  <Text key={i} style={styles.text}>
                    {d.split(' – ')[0]}
                  </Text>
                ))}
            </>
          ) : (
            <Text style={styles.text}>Not Available</Text>
          )}
          <Text style={styles.title}>Signature Solutions</Text>
          <Text style={styles.text}>{data.signature_primary}</Text>
          {data?.signature_secondary
            ?.filter(d => d !== data.signature_primary)
            .map((d, i) => (
              <Text style={styles.text} key={i}>
                {d}
              </Text>
            ))}
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Trend ID</Text>
              <Text style={styles.text}>{data.id}</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Last Updated</Text>
              <Text style={styles.text}>
                {data.modified_at
                  ? data.modified_at.split('T')[0]
                  : data.created_at.split('T')[0]}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: 'calc(66.66% - 10px)',
          }}
        >
          <Text style={styles.titleFirst}>Description</Text>
          <Text style={styles.text}>{data.description}</Text>
          <Text style={styles.title}>Impact on Development</Text>
          <Text style={styles.text}>{data.impact_description}</Text>
          <Text style={styles.title}>SDGs</Text>
          {data.sdgs?.map((sdg, i) => (
            <Text style={styles.text} key={i}>
              {sdg}
            </Text>
          ))}
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
          <Link src={`${WEB_ADDRESS}trends/${data.id}`} style={styles.linkText}>
            View Details
          </Link>
        </View>
      </View>
      <Text
        render={() =>
          "Signals and trends are individuals' observations and do not represent the official views of UNDP"
        }
        fixed
      />
    </Page>
  );
}
