import { Layout } from "@root/components";
import useSWR from "swr";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_GROUP_URL,
  TWITTER_URL,
  DEV_FUND_ADDRESS,
  MEDIUM_URL,
} from "../src/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  callContract,
  contractFetcher,
  isAddressZero,
  useLocalStorageSerializeKey,
} from "@root/utils";
import { REF_LINK } from "../src/config/local-storage";
import Header from "../src/components/header/header";
import { useChainId, useAccount, useProvider, useSigner, Address } from "wagmi";
import { Signer, ethers } from "ethers";
import SIX_TOKEN_ABI from "./../src/abis/PonziToken.json";
// import { isAddress } from "ethers/lib/utils.js";
import { toast } from "react-toastify";
import { getContract } from "../src/config/contracts";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { getUrl } from "../src/config/urls";
import Alert from "@mui/material/Alert";

// const irishGrover = Irish_Grover({ weight: "400", subsets: ["latin"] });

// const commonTypoSx = {
//   background: `url('/svgs/typo-bg.svg')`,
//   backgroundSize: "contain",
//   backgroundPosition: "center",
//   padding: { lg: 4, xs: 2 },
//   backgroundRepeat: "no-repeat",
//   color: "#FFD500",
//   fontSize: { lg: 48, xs: 36 },
// };

// const cardsData = [
//   {
//     title: "So fair and Square",
//     content: `First and foremost, we embrace the community-first approach. We believe $VANG is for everyone. It’s a fair launch that allows all participants equal access to $VANG token over a long period of time (just like Bitcoin).`,
//     transform: "",
//     color: "#3DD9C6;",
//     maxWidth: 400,
//   },

//   {
//     title: "Much Innovation",
//     content: `We value innovation and are dedicated to constantly improving and evolving. This includes exploring new ideas and technologies to generate real values for the Cau Vang community.`,
//     transform: "",
//     color: "#D9633D",
//     maxWidth: 451,
//   },
//   {
//     title: "Very Loving Community",
//     content: `Inclusivity is our key value and we strive to create a welcoming and open community for all individuals. All are welcome to become Golden Boys.`,
//     transform: "",
//     color: "#3D60D9;",
//     maxWidth: 451,
//   },
//   {
//     title: "Such Dawg Energy",
//     content: `Even if you do not have an opinion on our products or on Optimism technicalities, just share your positivity and you're already creating value! This includes using humor and memes to engage with other Golden Boy followers and encourage participation.`,
//     transform: "",
//     color: "#C3D93D",
//     maxWidth: 451,
//   },
// ];

const InitSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  minHeight: "500px",
  paddingBottom: 50,
  paddingTop: 50,
  backgroundColor: "#F2F9FE",
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("lg")]: {
    minHeight: "592px",
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const IntroSection = styled(InitSection)(({ theme }) => ({
  // backgroundImage: `url('/images/intro-bg.png')`,
  backgroundColor: "transparent",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingTop: 100,
  [theme.breakpoints.up("lg")]: {
    paddingTop: 150,
    minHeight: "100vh",
  },
}));

const CommonSection = styled(InitSection)(({ theme }) => ({
  paddingTop: 60,
  [theme.breakpoints.up("lg")]: {
    paddingTop: 100,
  },
}));

// TODO: button generate ref link -> react copy -> sau khi click copy thi show ref link
// TODO: button copy ref link -> https://codesandbox.io/s/react-copy-to-clipboard-button-with-material-ui-c8sly3?file=/CopyToClipboardButton.js:364-675
// TODO: REDIRECT TO UNISWAP with token six address. Ex: https://app.uniswap.org/#/swap?outputCurrency=0x70867288a47045e156c5fe2370c33a8900ebea59

interface IUserInfo {
  referred: boolean;
  referredBy: Address;
}

export function Index() {
  /* ──────────────────────────ROUTING──────────────────────────────────*/
  const router = useRouter();
  const { ref } = router.query;
  // const ref = useRef(null);

  /* ──────────────────────────WEB3 HOOKS──────────────────────────────────*/
  const chainId = useChainId();
  const { address: account } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const sixAddress = getContract(chainId, "SIX_TOKEN");

  // contract instance
  const contract = new ethers.Contract(
    sixAddress,
    SIX_TOKEN_ABI.abi,
    signer as Signer
  );

  /* ──────────────────────────STATES──────────────────────────────────*/
  const [warningFlag, setWarningFlag] = useState(true);

  const [refLocal, setRefLocal] = useLocalStorageSerializeKey<string>(
    [REF_LINK],
    DEV_FUND_ADDRESS
  );

  /* ──────────────────────────USER_INTERACTION──────────────────────────────────*/
  function handleSubscribe() {
    toast.promise(
      callContract(chainId, contract, "setParent", [refLocal], {}),
      {
        pending: "Subscribe submitted.",
        success: "Subscribe success",
        error: "Subscribe failed.",
      }
    );
  }

  function handleBuySix() {
    window.open(`${getUrl(chainId)}${sixAddress}`, "_ blank");
  }

  function handleGenerate() {
    if (!account) {
      toast.error("Please connect wallet!");
      return;
    }

    navigator.clipboard.writeText(
      `${window.location.hostname.toString()}?ref=${account}`
    );
    toast.success("Copy to clipboard");
  }

  /* ──────────────────────────EFFECTS──────────────────────────────────*/
  const { data: userInfo } = useSWR<IUserInfo>(
    [`usersInfo:${account}`, chainId, sixAddress, "usersInfo", account],
    contractFetcher(provider, SIX_TOKEN_ABI),
    {
      refreshInterval: 10000,
    }
  );

  // useEffect(() => {
  //   const executeScroll = () =>
  //     ref?.current?.scrollIntoView({ block: "start", behavior: "instant" });
  //   executeScroll();
  // }, []);

  /**
   * @dev handle ref link with local storage
   * Case 1: access website without ref link ⇒ parent = DEFAULT_REF_ADDRESS
   * Case 2: access website with ref link ⇒ parent = ref link
   * Case 3: access website with ref link → delete ref link ⇒ parent still = ref link (save local storage before)
   * Case 4: access website with ref link -> update ref link => parent = latest ref link
   */
  useEffect(() => {
    if (
      ref?.toString().toLowerCase() == refLocal.toLowerCase() ||
      !ref?.toString().startsWith("0x")
    ) {
      return;
    }

    setRefLocal(ref?.toString());
  }, [ref, refLocal, setRefLocal]);

  /* ──────────────────────────REACTIVE STATES──────────────────────────────────*/
  /// user subscribed or user is referral anyone
  const isDisableSubscribe =
    !isAddressZero(userInfo?.referredBy) || userInfo?.referred;

  const steps: {
    text: React.ReactElement;
    buttonText: string;
    buttonColor: string;
    onClick: () => void;
    isDisable?: boolean;
  }[] = [
    {
      text: (
        <Typography component={"div"} fontSize={18}>
          <Typography gutterBottom>
            Ask your friend for their referral link.
          </Typography>
          <Typography>Then press “Subscribe” button</Typography>
        </Typography>
      ),
      buttonText: "Subscribe",
      onClick: handleSubscribe,
      buttonColor: "#BBED98",
      isDisable: isDisableSubscribe,
    },
    {
      text: (
        <Typography component={"div"} fontSize={18}>
          <Typography gutterBottom>Buy some $SIX on Camelot</Typography>
        </Typography>
      ),
      buttonText: "Buy SIX",
      onClick: handleBuySix,
      buttonColor: "#73E5F4",
    },
    {
      text: (
        <Typography component={"div"} fontSize={18}>
          <Typography gutterBottom>Generate your referral link.</Typography>
          <Typography gutterBottom>Share to your friends.</Typography>
          <Typography gutterBottom>
            Sit back & enjoy your commission now!
          </Typography>
        </Typography>
      ),
      buttonText: "Generate",
      onClick: handleGenerate,
      buttonColor: "#EB98ED",
    },
  ];

  return (
    <>
      {warningFlag && (
        <Alert
          severity="warning"
          onClose={() => {
            setWarningFlag(false);
          }}
        >
          $SIX contract address is {sixAddress}. Be sure to check it before
          trading to avoid fake and malicious contracts!
        </Alert>
      )}
      <Layout header={<Header />}>
        {/* Intro section */}
        <IntroSection
          sx={{
            position: "relative",
            width: "100%",
            background:
              "linear-gradient(120.2deg, #138A94 19.53%, #4CBA99 103.75%)",
            "& img": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              right: 0,
              bottom: 0,
              objectFit: "cover",
              objectPosition: "top",
              zIndex: 0,
            },
          }}
        >
          <Image
            src="/svgs/top-banner.svg"
            alt="Intro bg"
            width={454}
            height={403}
            priority
          />
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transform: {
                xl: "none",
                lg: "translate(40px, -50px)",
                xs: "none",
              },
              zIndex: 1,
              alignItems: "center",
              color: "white",
            }}
          >
            <Typography variant="h1" gutterBottom textAlign="center">
              $SIX
            </Typography>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              lineHeight={1}
            >
              Super Deflationary - Multi-level Referral - Real Yield Token
            </Typography>
            <Box display="flex" gap={3}>
              <Button
                disabled={isDisableSubscribe}
                sx={{
                  background: "#FAE084",
                  color: "#1C5452",
                  width: { lg: 250, xs: 150 },
                  "&:hover": {
                    background: "#f9dc73",
                  },
                }}
                LinkComponent={Link}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
              <Button
                sx={{
                  background: "#14706C",
                  color: "white",
                  width: { lg: 250, xs: 150 },
                  "&:hover": {
                    background: "#0d5854",
                  },
                }}
                onClick={handleBuySix}
              >
                Buy SIX
              </Button>
            </Box>
            <Typography
              component={"div"}
              textAlign="center"
              fontSize={20}
              maxWidth="sm"
            >
              If you’re invited by a friend, please click “Subscribe” button to
              get
              <Typography display="inline" color="#FAE084">{` 2% `}</Typography>
              rebate on every Buy and Sell order
            </Typography>
          </Container>
        </IntroSection>
        {/* What Section */}
        <CommonSection
          sx={{
            backgroundImage: "url('/svgs/what-bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "",
            backgroundPosition: "right 0 top -200px",
            paddingBottom: { lg: 15, xs: 2 },
          }}
          id="about"
        >
          <Box
            display="flex"
            justifyContent="center"
            // alignItems={{ lg: "flex-start", xs: "center" }}
            alignItems={"center"}
            // flexDirection="column"
            gap={3}
            paddingBottom={6}
          >
            <Image
              src="/svgs/six-token-1.svg"
              alt="Hold me to da mars"
              width={120}
              height={120}
            />
            <Typography fontSize={80} textAlign="left" fontWeight={600}>
              $SIX
            </Typography>
            <Typography fontSize={24} textAlign="left" fontWeight={600}>
              Is Not Just Another Token
            </Typography>
          </Box>
          <Grid container maxWidth="md">
            <Grid
              item
              // lg={8}
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap={2}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { lg: 8, xs: 2 },
                  position: "relative",
                  boxShadow: "0px 24px 64px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box display={{ lg: "initial", xs: "none" }}>
                  <Image
                    src="/svgs/+__paper-1.svg"
                    alt="+ paper background"
                    width={20}
                    height={20}
                    style={{
                      position: "absolute",
                      top: 32,
                      right: 32,
                    }}
                  />
                  <Image
                    src="/svgs/+__paper-1.svg"
                    alt="+ paper background"
                    width={12}
                    height={12}
                    style={{
                      position: "absolute",
                      bottom: 32,
                      left: 32,
                    }}
                  />
                </Box>
                <Typography component="div" textAlign="justify">
                  <Typography gutterBottom>
                    There were other tokens, and then there is $SIX.
                  </Typography>
                  <Typography gutterBottom>
                    We aim to launch the fairest token possible, one that
                    creates real value and real yield for its holders as the
                    ecosystem grows. No VCs, no IDO - no fear of significant
                    dumping from big and early adopters.
                  </Typography>
                  <Typography gutterBottom>
                    $SIX applies a fair launch model similar to Bitcoin, which
                    would result in a more stable growth trajectory:
                  </Typography>
                  <Typography
                    component={"ul"}
                    sx={{
                      "li::marker": {
                        content: '"•  "',
                      },
                    }}
                    paddingLeft={2}
                    gutterBottom
                  >
                    <Typography component={"li"}>
                      {`Initially, the token's price is set at a very low value.`}
                    </Typography>
                    <Typography component={"li"}>
                      {`Those who lack faith in its long-term potential engage in pumps-and-dumps to maximize short-term profits.`}
                    </Typography>
                    <Typography component={"li"}>
                      {`Those who believe in its long-term value accumulate and hold the token.`}
                    </Typography>
                    <Typography component={"li"}>
                      {`Like Bitcoin, $SIX does not rely on VCs or hold reserves for the development team. There are no periodic vesting events or token unlocks designed for scheduled dumping.`}
                    </Typography>
                    <Typography component={"li"}>
                      {`Bitcoin’s ecosystem has developed in a stable and healthy manner, ensuring its longevity. $SIX aims to do exactly that.`}
                    </Typography>
                  </Typography>
                  <Typography gutterBottom>
                    In the beginning, $SIX is a token fused with a multi-level
                    referral system to build momentum. However, over time, we
                    will work towards developing an ecosystem of various DeFi
                    apps and use cases that bring forth increased utility and
                    intrinsic value for $SIX. Our ultimate goal is to provide
                    sustainable profits for those who believe in and support our
                    project.
                  </Typography>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CommonSection>
        {/* Total supply and referral commission section */}
        <CommonSection
          sx={{
            backgroundImage: "url('/svgs/total-supply-bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPositionY: "300px",
            backgroundPositionX: "-60px",
          }}
        >
          {/* Total supply */}
          <Box
            display="flex"
            justifyContent="center"
            mb={{ lg: 15, xs: 0 }}
            id="tokennomics"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Image
                src="/svgs/six-token-1.svg"
                alt="Hold me to da mars"
                width={60}
                height={60}
              />
              <Typography fontSize={36} fontWeight={600}>
                Total supply: 666,666,666
              </Typography>
            </Box>
          </Box>
          <Grid container maxWidth="lg" paddingBottom={{ lg: 20, xs: 5 }}>
            <Grid
              item
              xs={12}
              lg={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/svgs/pie-chart.svg"
                alt="pie chart"
                width={500}
                height={550}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              <Typography fontSize={32}>Tax on Buy/Sell Model</Typography>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#FAE084",
                  p: 4,
                  position: "relative",
                  boxShadow: "0px 24px 64px rgba(250, 224, 132, 0.4)",
                }}
              >
                <Image
                  src="/svgs/+__paper-3.svg"
                  alt="+ paper background"
                  width={24}
                  height={24}
                  style={{
                    position: "absolute",
                    top: -32,
                    right: -32,
                  }}
                />
                <Typography component={"div"}>
                  <Typography fontWeight={600} gutterBottom>
                    If you have Upper Referrals - 4% tax:
                  </Typography>
                  <Typography>• 1%: burn</Typography>
                  <Typography>• 1%: development</Typography>
                  <Typography>
                    • 1% - 2%: commission to upper referrals or burn
                  </Typography>
                  <Typography>• 2%: rebate to you</Typography>
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#BBED98",
                  p: 4,
                  position: "relative",
                  boxShadow: "0px 24px 64px rgba(187, 237, 152, 0.4)",
                }}
              >
                <Image
                  src="/svgs/+__paper-4.svg"
                  alt="+ paper background"
                  width={24}
                  height={24}
                  style={{
                    position: "absolute",
                    bottom: -32,
                    left: -32,
                  }}
                />
                <Typography component={"div"}>
                  <Typography fontWeight={600} gutterBottom>
                    If you have no Upper Referral - 6% tax:
                  </Typography>
                  <Typography>• 5%: burn</Typography>
                  <Typography>• 1%: development </Typography>
                  <Typography>• 0 %: rebate to you</Typography>
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Referrals commission */}
          <Typography
            fontSize={42}
            fontWeight={600}
            textAlign={"center"}
            id="referral-commission"
          >
            Referral Commission
          </Typography>
          <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Box
              // elevation={3}
              sx={{
                p: { lg: 3, xs: 1 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
                boxShadow: "0px 24px 64px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#FFFFFF",
                borderRadius: 1,
              }}
            >
              <Grid container maxWidth="md">
                <Grid item xs={2} lg={3}>
                  <Typography fontWeight={600}>Level</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Level 1</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Level 2</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Level 3</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Level 4</Typography>
                </Grid>
                <Grid item xs={2} lg={1}>
                  <Typography>Level 5</Typography>
                </Grid>
              </Grid>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    backgroundColor: "#A7D3A7",
                    borderRadius: "50%",
                    height: 5,
                    width: 5,
                    transform: "translateY(-50%)",
                    position: "absolute",
                  }}
                ></Box>
                <Divider sx={{ borderColor: "#A7D3A7" }} />
              </Box>
              <Grid container maxWidth="md">
                <Grid item xs={2} lg={3}>
                  <Typography fontWeight={600}>Commission</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>1%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>0.5%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>0.3%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>0.1%</Typography>
                </Grid>
                <Grid item xs={2} lg={1}>
                  <Typography>0.1%</Typography>
                </Grid>
              </Grid>
            </Box>

            <Typography textAlign="center" fontSize={24} mt={6}>
              Walkthrough example
            </Typography>

            <Box display="flex" justifyContent="center" mt={3}>
              <Image
                src="/svgs/walkthrough-example.svg"
                alt="Walkthrough example"
                width={880}
                height={480}
              />
            </Box>
          </Container>
        </CommonSection>
        {/* How to get in section */}
        <CommonSection
          sx={{
            backgroundImage: "url('/svgs/how-to-get-it-bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingBottom: 15,
          }}
          id="how-to"
        >
          <Container
            maxWidth="md"
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Typography fontSize={42} fontWeight={600} textAlign={"center"}>
              How to get in
            </Typography>
            {steps.map((el, index) => (
              <Grid
                container
                component={Paper}
                elevation={0}
                sx={{
                  boxShadow: "0px 24px 64px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#F2F9FD",
                }}
                key={el.buttonText}
                // sx={{ border: "1px solid black", borderRadius: 8 }}
                borderRadius={1}
                overflow="hidden"
              >
                <Grid
                  item
                  xs={3}
                  sx={{ backgroundColor: "white" }}
                  p={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    textAlign="center"
                    fontSize={80}
                    color={el.buttonColor}
                    fontWeight={600}
                  >
                    {`0${index + 1}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{ backgroundColor: "#F2F9FD" }}
                  py={3}
                  px={3}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    width={"100%"}
                    justifyContent="space-between"
                  >
                    <Box
                      display={"flex"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {el.text}
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Button
                        disabled={el.isDisable}
                        onClick={el.onClick}
                        sx={{
                          backgroundColor: el.buttonColor,
                          ":hover": {
                            backgroundColor: el.buttonColor,
                          },
                          color: "black",
                          width: 150,
                        }}
                      >
                        {el.buttonText}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Container>
        </CommonSection>
        {/* Road Map section */}
        <CommonSection
          sx={{
            paddingTop: { lg: 4, xs: 0 },
            color: "white",
            minHeight: { lg: 380 },
            backgroundColor: "#2E7474",
          }}
          id="road-map"
        >
          <Typography
            fontSize={42}
            fontWeight={600}
            textAlign={"center"}
            gutterBottom
          >
            Roadmap
          </Typography>
          <Typography textAlign={"justify"} maxWidth={"md"} component={"div"}>
            <Typography gutterBottom>
              With over 4 years of experience in the DeFi industry, we have
              established ourselves as a reliable and “based” team. However, we
              want to avoid making lofty promises and instead present you with a
              roadmap of what we want to achieve. Our first goal is to build a
              like-minded community of approximately 3,000 - 5,000 members.
              After that, we - now as a community, will consider several
              exciting ideas to benefit $SIX for the future:
            </Typography>
            <Typography
              component={"ul"}
              sx={{
                "li::marker": {
                  content: '"•  "',
                },
              }}
              paddingLeft={2}
              gutterBottom
            >
              <Typography component={"li"}>
                Launching an Automated Market Maker (AMM) platform where fees
                collected will be used to burn $SIX, increasing its scarcity and
                value.
              </Typography>
              <Typography component={"li"}>
                Establishing a perpetual DEX (Decentralized Exchange) that
                incorporates fee mechanisms that can be used to burn $SIX,
                further benefiting token holders.
              </Typography>
              <Typography component={"li"}>
                Introducing a new token called $SEVEN, featuring a
                fee-on-transfer mechanism designed to leverage the value and
                utility of $SIX.
              </Typography>
            </Typography>
            <Typography>
              By focusing on community growth and carefully considering these
              potential next steps, we aim to build a sustainable future for
              $SIX that rely on nothing except real value.
            </Typography>
          </Typography>

          <Box display="flex" gap={2} pt={4}>
            <IconButton
              component="a"
              LinkComponent={Link}
              target="_blank"
              href={TWITTER_URL}
            >
              <TwitterIcon sx={{ color: "white" }} />
            </IconButton>
            <Tooltip title="Group">
              <IconButton
                component="a"
                LinkComponent={Link}
                target="_blank"
                href={TELEGRAM_GROUP_URL}
              >
                <TelegramIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Channel">
              <IconButton
                component="a"
                LinkComponent={Link}
                target="_blank"
                href={TELEGRAM_CHANNEL_URL}
              >
                <TelegramIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <IconButton
              component="a"
              LinkComponent={Link}
              target="_blank"
              href={MEDIUM_URL}
            >
              <Image
                src="/svgs/medium-icon.svg"
                alt="Medium icon"
                width={38}
                height={38}
                style={{ color: "white" }}
                priority
              />
            </IconButton>
          </Box>
        </CommonSection>
      </Layout>
    </>
  );
}

export default Index;
