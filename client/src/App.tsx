import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useLayoutEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import FeedbackPage from "./pages/FeedbackPage";
import PurchasePage from "./pages/PurchasePage";
import ShowcasePage from "./pages/ShowcasePage";
import CookieConsent from "./components/CookieConsent";
import { CookiePolicyPage, PrivacyPolicyPage } from "./pages/PolicyPages";

function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.classList.add("route-pending");
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    body.scrollTop = 0;

    const frame = window.requestAnimationFrame(() => {
      root.classList.remove("route-pending");
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      root.classList.remove("route-pending");
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [location]);

  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Switch><Route path="/" component={Home} /><Route path="/showcase" component={ShowcasePage} /><Route path="/product/:id" component={ProductPage} /><Route path="/purchase/:id" component={PurchasePage} /><Route path="/feedback" component={FeedbackPage} /><Route path="/cookie-policy" component={CookiePolicyPage} /><Route path="/privacy-policy" component={PrivacyPolicyPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable><TooltipProvider><Toaster /><ScrollToTop /><Router /><CookieConsent /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
