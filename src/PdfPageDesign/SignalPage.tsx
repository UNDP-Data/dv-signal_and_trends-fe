/* eslint-disable jsx-a11y/anchor-is-valid */
import { Page, View, StyleSheet, Text, Link } from '@react-pdf/renderer';
import { TrendDataType, SignalDataType } from '../Types';
import { WEB_ADDRESS } from '../Constants';

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
    color: '#59BA47',
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
  listText: {
    fontSize: '10px',
    textAlign: 'left',
    fontFamily: font,
    marginBottom: 10,
    color: '#000',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  listTextWOLink: {
    fontSize: '12px',
    textAlign: 'left',
    fontFamily: font,
    marginBottom: 10,
    color: '#000',
  },
  linkText: {
    fontSize: '10px',
    textAlign: 'left',
    fontFamily: font,
    marginTop: 10,
    color: '#59BA47',
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
    backgroundColor: '#59BA47',
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
  data: SignalDataType;
  connectedTrendsForSignalsForPrinting: TrendDataType[];
}

export function SignalPage(props: Props) {
  const { data, connectedTrendsForSignalsForPrinting } = props;
  return (
    <Page style={styles.page} orientation='landscape'>
      <View style={styles.insidePageSection}>
        <Text style={styles.title}>Signal</Text>
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
          <Text style={styles.title}>Location</Text>
          <Text style={styles.text}>{data.location}</Text>
          <Text style={styles.title}>STEEP+V</Text>
          <Text style={styles.text}>{data.steep}</Text>
          <Text style={styles.title}>Signature Solutions</Text>
          <Text style={styles.listTextWOLink}>{data.signature_primary}</Text>
          {data?.signature_secondary
            ?.filter(d => d !== data.signature_primary)
            .map((d, i) => (
              <Text style={styles.text} key={i}>
                {d}
              </Text>
            ))}
          {data.connected_trends?.length === 0 ||
          data.connected_trends === null ? (
            <Text style={styles.title}>No trends attached to this signals</Text>
          ) : (
            <>
              <Text style={styles.title}>Most Recent 5 trends</Text>
              <View style={styles.pageBoxBG}>
                {data.connected_trends
                  .filter((_cs, i) => i < 5)
                  .map((cs, j) => (
                    <Link
                      src={`${WEB_ADDRESS}trends/${cs}`}
                      key={j}
                      style={styles.listText}
                    >
                      {
                        connectedTrendsForSignalsForPrinting[
                          connectedTrendsForSignalsForPrinting.findIndex(
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
          <Text style={styles.title}>Signal ID</Text>
          <Text style={styles.text}>{data.id}</Text>
        </View>
        <View
          style={{
            width: 'calc(66.66% - 10px)',
          }}
        >
          <Text style={styles.title}>Description</Text>
          <Text style={styles.text}>{data.description}</Text>
          <Text style={styles.title}>Relevance</Text>
          <Text style={styles.text}>{data.relevance}</Text>
          <Text style={styles.title}>Source</Text>
          <Text style={styles.text}>{data.url}</Text>
          <Text style={styles.title}>SDGs</Text>
          {data.sdgs.map((sdg, i) => (
            <Text style={styles.listTextWOLink} key={i}>
              {sdg}
            </Text>
          ))}
          <Link
            src={`${WEB_ADDRESS}signals/${data.id}`}
            style={styles.linkText}
          >
            View Details
          </Link>
        </View>
      </View>
    </Page>
  );
}
