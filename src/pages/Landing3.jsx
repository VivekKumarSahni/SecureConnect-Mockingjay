import React from 'react';
import Link from 'next/link'; // Added for internal navigation
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowRight, LogIn, UserPlus } from "lucide-react";

function LandingPage() {
  const recentRescueTasks = [
    { id: 1, title: "Flood Evacuation", location: "Riverside County", date: "2024-07-15" },
    { id: 2, title: "Wildfire Response", location: "Mountain Ridge", date: "2024-07-14" },
    { id: 3, title: "Earthquake Relief", location: "Coastal City", date: "2024-07-13" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background z-50 shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <span className="ml-2 text-lg font-semibold">DMS Portal</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-lg">
                  Disaster Management System Portal
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-lg">
                  Rapid response and coordination for emergency situations. Together, we can save lives.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/sos">
                  <Button className="bg-red-600 hover:bg-red-700 text-white" size="lg">
                    SOS - Request Immediate Help
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Network Section */}
        {/* ... (rest of the code remains unchanged, except for replacing <a> with <Link> where appropriate) */}

        {/* Recent Rescue Tasks Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Recent Rescue Tasks</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentRescueTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Date: {task.date}</p>
                    <Link href={`/task/${task.id}`} className="flex items-center text-sm text-blue-600 mt-2">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 Disaster Management System. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
